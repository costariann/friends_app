import { Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../App';

function UserGrid({ users, setUsers }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + '/friends');
        const data = await res.json();
        console.log('fetch data:', data);
        if (!res.ok) {
          throw new Error(data.Error);
        }
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);
  console.log(users);
  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </Grid>
      {loading && (
        <Flex justifyContent={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && users.length === 0 && (
        <Text fontSize={'xl'}>
          <Text as={'span'} fontSize={'2xl'} fontWeight={'bold'} mr={2}>
            Poor you! 😟
          </Text>
          No friends found
        </Text>
      )}
    </>
  );
}

export default UserGrid;
