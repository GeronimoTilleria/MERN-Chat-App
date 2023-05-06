import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if(pics.type === 'image/jpg' || pics.type === 'image/png'){
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dn9nyexrm');
            fetch('https://api.cloudinary.com/v1_1/dn9nyexrm/image/upload', {
                method: 'post',
                body: data
            }).then(res => res.json())
              .then(data => {
                setPic(data.url.toString());
                console.log(data);
                setLoading(false);
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
              });
        } else {
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = () => { };

    return (
        <VStack spacing='5px' color='black'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter your name'
                    onChange={e => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type='email'
                    placeholder='Enter your email'
                    onChange={e => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {
                                show ? 'Hide' : 'Show'
                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        onChange={e => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {
                                show ? 'Hide' : 'Show'
                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={e => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup
