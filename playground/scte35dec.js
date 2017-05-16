import base64
import bitstring

class MixinDictRepr(object):
    def __repr__(self, *args, **kwargs):
        return repr(self.__dict__)

class SCTE35_ParseException(Exception):
    pass

class SCTE35_SpliceInfoSectionException(Exception):
    pass

class SCTE35_SpliceInfoSection(MixinDictRepr):

    def __init__(self, table_id):
        if table_id != 0xfc:
            raise SCTE35_SpliceInfoSectionException("%d valid. Should be 0xfc" %
                                                    table_id)

class SCTE35_SpliceInsert(MixinDictRepr):

    class Splice_Time(MixinDictRepr):
        def __init__(self):
            pass

    class Component(MixinDictRepr):
        def __init__(self, tag):
            self.tag = tag
            self.splice_time = None

    class BreakDuration(MixinDictRepr):
        def __init__(self):
            self.auto_return = None
            self.duration = None

    def __init__(self, splice_id):
        self.splice_id = splice_id
        self.components = []


class SCTE35_SpliceDescriptor(MixinDictRepr):
    pass


class SCTE35_Parser(object):

    def parse(self, input_bytes):
        input_bitarray = bitstring.BitString(bytes=input_bytes)

        table_id = input_bitarray.read("uint:8")
        splice_info_section = SCTE35_SpliceInfoSection(table_id)

        splice_info_section.section_syntax_indicator = input_bitarray.read("bool")
        splice_info_section.private = input_bitarray.read("bool")
        #private
        input_bitarray.pos += 2
        splice_info_section.section_length = input_bitarray.read("uint:12")
        splice_info_section.protocol_version = input_bitarray.read("uint:8")
        splice_info_section.encrypted_packet = input_bitarray.read("bool")
        splice_info_section.encryption_algorithm = input_bitarray.read("uint:6")
        splice_info_section.pts_adjustment = input_bitarray.read("uint:33")
        splice_info_section.cw_index = input_bitarray.read("uint:8")
        splice_info_section.tier = input_bitarray.read("hex:12")
        splice_info_section.splice_command_length = input_bitarray.read("uint:12")

        splice_info_section.splice_command_type = input_bitarray.read("uint:8")

        # splice command type parsing
        if splice_info_section.splice_command_type == 5:
            splice_info_section.splice_command = self.__parse_splice_insert(input_bitarray)
        else:
            raise SCTE35_SpliceInfoSectionException("splice_command_type: %d not yet supported" % splice_info_section.splice_command_type)

        splice_info_section.splice_descriptor_loop_length = input_bitarray.read("uint:16")
        splice_info_section.splice_descriptors = None

        if splice_info_section.splice_descriptor_loop_length > 0:
            splice_info_section.splice_descriptors = \
             self.__parse_splice_descriptors(input_bitarray,
                                             splice_info_section.splice_descriptor_loop_length)

        return splice_info_section

    def __parse_splice_time(self, bitarray):
        splice_time = SCTE35_SpliceInsert.Splice_Time()
        splice_time.time_specified_flag = bitarray.read("bool")

        if splice_time.time_specified_flag:
            # Reserved for 6 bits
            bitarray.pos += 6
            splice_time.pts_time = bitarray.read("uint:33")
        else:
            bitarray.pos += 7

        return splice_time

    def __parse_break_duration(self, bitarray):
        break_duration = SCTE35_SpliceInsert.BreakDuration()
        break_duration.auto_return = bitarray.read("bool")
        bitarray.pos += 6
        break_duration.duration = bitarray.read("uint:33")
        return break_duration

    def __parse_splice_insert(self, bitarray):
        splice_event_id = bitarray.read("uint:32")
        ssi = SCTE35_SpliceInsert(splice_event_id)

        ssi.splice_event_cancel_indicator = bitarray.read("bool")
        bitarray.pos += 7

        if not ssi.splice_event_cancel_indicator:
            ssi.out_of_network_indicator = bitarray.read("bool")
            ssi.program_splice_flag = bitarray.read("bool")
            ssi.duration_flag = bitarray.read("bool")
            ssi.splice_immediate_flag = bitarray.read("bool")
            # Next 4 bits are reserved
            bitarray.pos += 4

            if ssi.program_splice_flag and not ssi.splice_immediate_flag:
                ssi.splice_time = self.__parse_splice_time(bitarray)

            if not ssi.program_splice_flag:
                ssi.component_count = bitarray.read("uint:8")

                for i in xrange(0, ssi.component_count):
                    component = SCTE35_SpliceInsert.Component(bitarray.read("uint:8"))
                    if ssi.splice_immediate_flag:
                        component.splice_time = self.__parse_splice_time(bitarray)
                    ssi.components.append(component)


            if ssi.duration_flag:
                ssi.break_duration = self.__parse_break_duration(bitarray)

            ssi.unique_program_id = bitarray.read("uint:16")
            ssi.avail_num = bitarray.read("uint:8")
            ssi.avails_expected = bitarray.read("uint:8")
            return ssi

    def __parse_splice_descriptors(self, bitarray, length):

        results = []

        while length > 6:
            splice_desc = SCTE35_SpliceDescriptor();

            splice_desc.splice_descriptor_tag = bitarray.read("uint:8")
            splice_desc.descriptor_length = bitarray.read("uint:8")
            splice_desc.identifier = bitarray.read("uint:32")

            length -= 6

            results.append( splice_desc )
        return results

if __name__ == "__main__":
    rawb64_input = r'/DAlAAAAAAAAAP/wFAUAAAABf+/+LRQrAP4BI9MIAAEBAQAAfxV6SQ=='
    myinput = base64.standard_b64decode(rawb64_input)

    splice_info_section = SCTE35_Parser().parse(myinput)

    print "Parsing Complete"

    print splice_info_section
