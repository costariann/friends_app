import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { BiAddToQueue } from 'react-icons/bi';
import { BASE_URL } from '../App';

function CreateUserModal({ setUsers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    name: '',
    role: '',
    description: '',
    gender: '',
  });

  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + '/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: 'success',
        title: 'Yayy! 🎉',
        description: 'Friend created successfully',
        duration: 2000,
        position: 'top-center',
      });
      onClose();
      setUsers((prevUsers) => [...prevUsers, data]);
      setInput({
        name: '',
        role: '',
        description: '',
        gender: '',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'An error occured.',
        description: error.message,
        duration: 2000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>My new BFF😍 </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={'center'} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="software engineer"
                    value={input.value}
                    onChange={(e) =>
                      setInput({ ...input, role: e.target.value })
                    }
                  />
                </FormControl>
              </Flex>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="He is a software engineer who loves to code and build things"
                  resize="none"
                  overflowY="hidden"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                ></Textarea>
              </FormControl>
              <RadioGroup
                value={input.gender}
                onChange={(value) => setInput({ ...input, gender: value })}
                mt={4}
              >
                <Flex gap={5}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" loading={loading}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default CreateUserModal;
