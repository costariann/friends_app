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
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import { BASE_URL } from '../App';

function EditModal({ setUsers, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });

  const toast = useToast();

  const handleEditFriend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + '/friends/' + user.id, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? data : u))
      );

      toast({
        title: 'Yaayy!🎉🎉',
        status: 'success',
        description: 'Friend updated successfully',
        duration: 2000,
        position: 'top-center',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error occured',
        status: 'error',
        description: error.message,
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>
        <BiEditAlt size={20} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form>
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
                      setInput((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="software engineer"
                    value={input.role}
                    onChange={(e) =>
                      setInput((prev) => ({ ...prev, role: e.target.value }))
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
                    setInput((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></Textarea>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                onClick={handleEditFriend}
                loading={loading}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
