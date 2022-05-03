import {
  Button,
  Text,
  Box,
  FormControl,
  Stack,
  Input,
  Link,
  WarningOutlineIcon,
  Heading,
  HStack,
  Center,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import Toast from 'react-native-simple-toast';

const defaultEmail = "nhancu@gmail.com"

function Login({ navigation }) {
  
  const [email, setEmail] = useState(defaultEmail);
  const { tryLogin } = useContext(AuthContext);
  const [loginFail, setLoginFail] = useState(false);

  const onLoginPress = () => {
    setLoginFail(false)
    tryLogin(email).then(ok => {
      if (ok) {
        navigation.navigate("Root/MainApp/Homepage")
      } else {
        Toast.show('Invalid login!', Toast.SHORT, Toast.CENTER);
        setLoginFail(true)
      }
    })
  }

  const onGotoSignup = () => {
    navigation.navigate("Root/Auth/Signup")
  }

  return (
    <View style={styles.container}>
      <Box>
        <Image
          style={styles.logo}
          source={require('../../assets/app-logo.png')}
        />
      </Box>

      <Box style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Heading size="lg" mb="2" style={styles.textColor}>Welcome back</Heading>
          <Text>
            { loginFail ? `Login failed! Try again` : `Log in to your account`}
          </Text>
          <Image
            style={[styles.logo, styles.asideLogo]}
            source={require('../../assets/leaf.png')}
          />
        </View>

        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Username</FormControl.Label>
            <Input type="text" defaultValue={email} onChangeText={setEmail} />
          </Stack>
        </FormControl>
        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" defaultValue="123456" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              The Password field must be at least 8 characters.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>

      <Box>
        <Button
          style={styles.button}
          onPress={onLoginPress}
        >
          <Text color="white" fontSize="lg" bold>Login</Text>
        </Button>
        <Center>
          <HStack space={1}>
            <Text>Don't have an account?</Text>
            <Link onPress={onGotoSignup}>
              Sign up
            </Link>
          </HStack>
        </Center>
      </Box>
    </View>
  );
}


function Signup({ navigation }) {
  const onSignupPress = () => {
    alert("Signup");
    navigation.navigate("Root/Auth/Login");
  }

  const onGotoLogin = () => {
    navigation.navigate("Root/Auth/Login")
  }
  
  return (
    <View style={styles.container}>
      <Box style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Heading size="lg" mb="2" style={styles.textColor}>Register</Heading>
          <Text>Create your new account</Text>
          <Image
            style={[styles.logo, styles.asideLogo]}
            source={require('../../assets/leaf-2.png')}
          />
        </View>
        
        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Username</FormControl.Label>
            <Input type="text" placeholder="alex12, wayne12 ..." />
          </Stack>
        </FormControl>
        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" placeholder="adam57@gmail.com" />
          </Stack>
        </FormControl>
        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              The Password field must be at least 8 characters.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl isRequired marginBottom={2}>
          <Stack>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              The Confirm Password does not match.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>

      <Box>
        <Button
          style={styles.button}
          onPress={onSignupPress}
        >
          <Text color="white" fontSize="lg" bold>Sign up</Text>
        </Button>
        <Center>
          <HStack space={1}>
            <Text>Already have an account ?</Text>
            <Link onPress={onGotoLogin}>
              Login
            </Link>
          </HStack>
        </Center>
      </Box>
    </View>
  );
}


const DEBUG_COLOR = {
  SECONDARY: '#eaf5ef',
  PRIMARY: '#28554e',
  WHITE: 'white',

  // GREEN: 'green',
  // PINK: 'pink',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DEBUG_COLOR.WHITE,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 60,
  },
  logo: {
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: DEBUG_COLOR.PINK,
    width: "100%",
  },
  formHeader: {
    alignItems: "center",
    backgroundColor: DEBUG_COLOR.GREEN,
    marginBottom: 30,
  },
  asideLogo: {
    position: "absolute",
    right: 0,
    top: "-25%",
  },
  textColor: {
    color: DEBUG_COLOR.PRIMARY,
  },
  button: {
    backgroundColor: "#28554e",
    marginBottom: 10,
    borderRadius: 100,
    maxWidth: "80%",
    width: 287,
  }
})

export { Login, Signup }