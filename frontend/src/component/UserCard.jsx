import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from '../App';

function UserCard({ user, setUsers }) {
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + '/friends/' + user.id, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast({
        title: 'Friend deleted successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-center',
      });
    } catch (error) {
      toast({
        title: 'An error occured',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-center',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={1} gap={4} alignItems={'center'}>
            <Avatar src={user.imageUrl} />
            <Box>
              <Heading>{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal setUsers={setUsers} user={user} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size="sm"
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>{user.description}</CardBody>
    </Card>
  );
}

export default UserCard;
