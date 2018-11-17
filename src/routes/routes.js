import express from 'express';
import passport from 'passport';

import authController from '../components/auth/auth_controller';
import companiesController from '../components/companies/companies_controller';
import usersController from '../components/users/users_controller';
import ProjectsController from '../components/projects';
import UserProjectsController from '../components/user_projects';
import companyAddressesController from '../components/company_addresses/company_addresses_controller';
import companyPhoneNumbersController from '../components/company_phone_numbers/company_phone_numbers_controller';
import UserAddressesController from '../components/user_addresses';
import UserPhoneNumbersController from '../components/user_phone_numbers';
import { access, SELF, COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN } from '../middleware/accessControls';

require('./../middleware/passport')(passport);

const router = express.Router();
const authenticateViaToken = passport.authenticate('jwt', { session: false });

// ===================================================
// '/api/auth'
// =========================
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// ===================================================
// '/api/companies'
// =========================
router.get('/companies', authenticateViaToken, access([]), companiesController.getCompanies);
router.post('/companies', authenticateViaToken, access([COMPANY_EDITOR, COMPANY_ADMIN]), companiesController.addCompany);
router.put('/companies', authenticateViaToken, access([COMPANY_EDITOR, COMPANY_ADMIN]), companiesController.updateCompany);
router.delete('/companies', authenticateViaToken, access([]), companiesController.deleteCompany);

// ===================================================
// '/api/users'
// =========================
router.get(
  '/users',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.getUsers,
);

router.post(
  '/users/add_user',
  authenticateViaToken,
  access([COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.addUser,
);

router.put(
  '/users/update_user',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateWholeUser,
);

router.put(
  '/users/update_email',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateEmail,
);

router.put(
  '/users/update_name',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updateName,
);

router.put(
  '/users/update_password',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.updatePassword,
);

router.put(
  '/users/update_status',
  authenticateViaToken,
  access([SELF, COMPANY_EDITOR, COMPANY_ADMIN]),
  usersController.changeUserStatus,
);

router.delete(
  '/users/remove_user',
  authenticateViaToken,
  access([]),
  usersController.removeUser,
);

router.delete(
  '/users/remove_user_by_email',
  authenticateViaToken,
  access([]),
  usersController.removeUserByEmail,
);

// ===================================================
// '/api/projects'
// =========================
router.get('/projects', authenticateViaToken, ProjectsController.getProjects);
router.post('/projects', authenticateViaToken, ProjectsController.addProject);
router.put('/projects', authenticateViaToken, ProjectsController.updateProject);
router.delete('/projects', authenticateViaToken, ProjectsController.deleteProject);

// ===================================================
// '/api/user_projects'
// =========================
router.get('/user_projects', authenticateViaToken, UserProjectsController.getUserProjects);
router.post('/user_projects', authenticateViaToken, UserProjectsController.addUserProject);
router.put('/user_projects', authenticateViaToken, UserProjectsController.updateUserProject);
router.delete('/user_projects', authenticateViaToken, UserProjectsController.deleteUserProject);

// ===================================================
// '/api/company_addresses'
// =========================
router.get('/company_addresses', authenticateViaToken, companyAddressesController.getCompanyAddresses);
router.post('/company_addresses', authenticateViaToken, companyAddressesController.addCompanyAddress);
router.put('/company_addresses', authenticateViaToken, companyAddressesController.updateCompanyAddress);
router.delete('/company_addresses', authenticateViaToken, companyAddressesController.deleteCompanyAddress);

// ===================================================
// '/api/company_phone_numbers'
// =========================
router.get('/company_phone_numbers', authenticateViaToken, companyPhoneNumbersController.getCompanyPhoneNumbers);
router.post('/company_phone_numbers', authenticateViaToken, companyPhoneNumbersController.addCompanyPhoneNumber);
router.put('/company_phone_numbers', authenticateViaToken, companyPhoneNumbersController.updateCompanyPhoneNumber);
router.delete('/company_phone_numbers', authenticateViaToken, companyPhoneNumbersController.deleteCompanyPhoneNumber);

// ===================================================
// '/api/user_addresses'
// =========================
router.get(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.getUserAddresses,
);

router.post(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.addUserAddress,
);

router.put(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.updateUserAddress,
);

router.delete(
  '/user_addresses',
  authenticateViaToken,
  access([COMPANY_VIEWER, COMPANY_EDITOR, COMPANY_ADMIN]),
  UserAddressesController.deleteUserAddress);

// ===================================================
// '/api/user_phone_numbers'
// =========================
router.get('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.getUserPhoneNumbers);
router.post('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.addUserPhoneNumber);
router.put('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.updateUserPhoneNumber);
router.delete('/user_phone_numbers', authenticateViaToken, UserPhoneNumbersController.deleteUserPhoneNumber);

export default router;
