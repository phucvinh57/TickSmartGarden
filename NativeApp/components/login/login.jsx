import { Button, Text, Box, FormControl, Stack, Input, Link } from 'native-base'
import { WarningOutlineIcon } from 'native-base';
import { SafeAreaView } from "react-native";
import { normalStyle } from "../../styles";

export default function Login({ navigation }) {
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
                    <Input type="password" defaultValue="12345" placeholder="password" />
                    <FormControl.HelperText>
                        Must be atleast 8 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 8 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <Button small primary onPress={() => alert("Login")}
                style={{ width: '100%' }}
                marginBottom={1}
            >
                <Text color={'white'}>Login</Text>
            </Button>
            <Link onPress={() => navigation.navigate('Signup')}
                style={{
                    width: '100%',
                    alignItems: 'center'
                }}
                textAlign={'center'}
            >
                New user ? Create an account
            </Link>
        </Box>
    </SafeAreaView >
}