import {
    Text, Box, FormControl, HStack, Input,
    Switch, InputGroup, InputRightAddon, AddIcon, Button
} from "native-base";
import { SafeAreaView } from "react-native";
import { normalStyle } from "../../styles";

import DotSliderList from "../dotSliderList";

export default function DeviceInfo({ navigate }) {
    return <SafeAreaView style={normalStyle}>
        <Box width={250}>
            <FormControl marginBottom={2}>
                <FormControl.Label>Tên thiết bị</FormControl.Label>
                <Input type='text' placeholder="Máy bơm, Bóng đèn ..." />
            </FormControl>

            {/* <HStack alignItems={'center'}> */}
            <FormControl marginBottom={2}>
                <FormControl.Label>Thời gian hoạt động</FormControl.Label>
                <HStack space={2} justifyContent='center' alignItems={'center'}>
                    <InputGroup>
                        <Input keyboardType="numeric" placeholder="Number" />
                        <InputRightAddon children={"phút"} />
                    </InputGroup>
                    <Switch />
                </HStack>
            </FormControl>

            <Box>
                <HStack justifyContent={'space-between'} space={2} alignItems='center' marginBottom={2}>
                    <Text fontSize='md' fontWeight={'bold'} marginRight={2}>
                        Lịch bơm
                    </Text>
                    <Button size={'xs'} padding={1}>
                        <AddIcon size='3' color='white' />
                    </Button>
                </HStack>

                <DotSliderList
                    list={mockSchedList.map(sched =>
                        <SchedItem
                            name={sched.name}
                            cycle={sched.cycle}
                            key={sched.name}
                        />)
                    }
                    numItemsPerPage={2}
                />
            </Box>

            <Box>
                <HStack justifyContent={'space-between'} space={2} alignItems='center' marginBottom={2}>
                    <Text fontSize='md' fontWeight={'bold'} marginRight={2}>
                        Chính sách
                    </Text>
                    <Button size={'xs'} padding={1}>
                        <AddIcon size='3' color='white' />
                    </Button>
                </HStack>

                <DotSliderList
                    list={mockPolicyList.map(sched =>
                        <PolicyItem
                            name={sched.name}
                            action={sched.action}
                            key={sched.name}
                        />)
                    }
                    numItemsPerPage={2}
                />
            </Box>

            <Text fontSize='md' fontWeight={'bold'} marginRight={2}>
                Lịch sử hoạt động
            </Text>
        </Box>
    </SafeAreaView>
}

function SchedItem({ name, cycle }) {
    return <Box backgroundColor={'#eaf5ef'} padding='1.5' borderRadius={'sm'}>
        <Text color={'#28554e'} fontSize='sm'>
            {name}
        </Text>
        <Text color={'#898989'} fontSize='sm'>{cycle}</Text>
    </Box>
}

function PolicyItem({ name, action }) {
    return <Box backgroundColor={'#eaf5ef'} padding='1.5' borderRadius={'sm'}>
        <Text color={'#28554e'} fontSize='sm'>
            {name}
        </Text>
        <Text color={'#898989'} fontSize='sm'>{action}</Text>
    </Box>
}

const mockSchedList = [{
    name: 'Bơm sáng 1',
    cycle: '8h00p mỗi ngày'
}, {
    name: 'Bơm trưa 1',
    cycle: '13h00p mỗi 3 ngày'
}, {
    name: 'Bơm chiều 1',
    cycle: '18h00p mỗi ngày'
}, {
    name: 'Bơm sáng 2',
    cycle: '8h00p mỗi ngày'
}, {
    name: 'Bơm trưa 2',
    cycle: '13h00p mỗi 3 ngày'
}, {
    name: 'Bơm chiều 2',
    cycle: '18h00p mỗi ngày'
}, {
    name: 'Bơm sáng 3',
    cycle: '8h00p mỗi ngày'
}, {
    name: 'Bơm trưa 3',
    cycle: '13h00p mỗi 3 ngày'
}, {
    name: 'Bơm chiều 3',
    cycle: '18h00p mỗi ngày'
}]

const mockPolicyList = [{
    name: 'Rửa bụi',
    action: 'Bật máy bơm'
}, {
    name: 'Giải hạn hè',
    action: 'Bật máy bơm'
}, {
    name: 'Giải hạn đông',
    action: 'Bật đèn'
}, {
    name: 'Cấp oxy',
    action: 'Bật máy lọc khí'
}]