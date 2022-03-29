import { Button, Text, Box, FormControl, Stack, Input, Link } from 'native-base'
import { WarningOutlineIcon } from 'native-base';
import { SafeAreaView } from "react-native";
import { normalStyle } from "../../styles";

export default function Signup({ navigation }) {
    return <SafeAreaView style={normalStyle}>
        <Box alignItems={'center'} width={250}>
            <FormControl isRequired marginBottom={2}>
                <Stack>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input type='text' placeholder="alex12, wayne12 ..." />
                </Stack>
            </FormControl>
            <FormControl isRequired marginBottom={2}>
                <Stack>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" placeholder="**********" />
                    <FormControl.HelperText>
                        Must be atleast 8 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 8 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            <FormControl isRequired marginBottom={2}>
                <Stack>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input type="email" placeholder="adam57@gmail.com" />
                </Stack>
            </FormControl>

            <Button small primary onPress={() => alert("Signup")}
                style={{ width: '100%' }}
                marginBottom={1}
            >
                <Text color={'white'}>Signup</Text>
            </Button>
            <Link onPress={() => navigation.navigate('Login')}
                style={{
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                Already have an account ? Login
            </Link>
        </Box>
    </SafeAreaView >
}