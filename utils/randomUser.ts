import { faker } from '@faker-js/faker';

export function generateRandomCredentials() {
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password({ length: 12, memorable: false });

  return { email, password };
}

function generateRandomSignupData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const organization = faker.company.name();

  const businessTypes = [
    "Retail",
    "Construction",
    "SaaS",
    "Finance",
    "Transportation",
    "Energy"
  ];
  const businessType = faker.helpers.arrayElement(businessTypes);

  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const password = faker.internet.password({ length: 12, memorable: false });
  const confirmPassword = password;

  return {
    firstName,
    lastName,
    organization,
    businessType,
    email,
    password,
    confirmPassword
  };
}

// ✅ Export for CommonJS
module.exports = {
  generateRandomCredentials,
  generateRandomSignupData
};