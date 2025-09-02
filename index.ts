import Elysia from 'elysia';
import { AppDataSource } from './src/data-source';
import { User } from './src/entities/User';

await AppDataSource.initialize();
console.log('Data Source initialized!');

const userRepo = AppDataSource.getRepository(User);

// Create Elysia app
const app = new Elysia();

// GET all users
app.get('/users', async () => {
  return await userRepo.find();
});

// GET user by ID
app.get('/users/:id', async ({ params }: { params: { id: string } }) => {
  const user = await userRepo.findOneBy({ id: Number(params.id) });
  return user || { message: 'User not found' };
});

// POST create user
app.post('/users', async ({ body }: { body: Partial<User> }) => {
  const user = userRepo.create(body);
  return await userRepo.save(user);
});

// PUT update user
app.put(
  '/users/:id',
  async ({ params, body }: { params: { id: string }; body: Partial<User> }) => {
    let user = await userRepo.findOneBy({ id: Number(params.id) });
    if (!user) return { message: 'User not found' };
    userRepo.merge(user, body);
    return await userRepo.save(user);
  }
);

// DELETE user
app.delete('/users/:id', async ({ params }: { params: { id: string } }) => {
  const user = await userRepo.findOneBy({ id: Number(params.id) });
  if (!user) return { message: 'User not found' };
  return await userRepo.remove(user);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));