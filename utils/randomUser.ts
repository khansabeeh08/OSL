import { faker } from '@faker-js/faker';

export function generateRandomCredentials() {
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password({ length: 12, memorable: false });

  return { email, password };
}