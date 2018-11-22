import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: `${config.baseURL}`,
  timeout: 5000,
});

describe('Given AuthController', () => {
  describe('and a super user is logged in', () => {
    beforeAll(done => {
      axiosInstance
        .post('/api/auth/login', {
          email: 'super.admin@email.fake',
          password: 'supersecure',
        })
        .then(res => {
          axiosInstance.defaults.headers.common.Authorization = res.data.data.token;
          done();
        })
        .catch(() => {
          done();
        });
    });

    /* /api/auth/login */
    describe('user tries to login', () => {
      const postData = {
        email: 'company.admin@email.fake',
        password: 'supersecure',
      };

      it('should log user in', done => {
        axiosInstance
          .post('/api/auth/login', postData)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);
            expect(res.data.data.token.includes('Bearer')).toBe(true);
            done();
          })
          .catch(err => {
            console.log(err);
            throw new Error(err);
          });
      });
    });

    /* /api/auth/register */
    describe('and user tries to register an account', () => {
      let postData;
      let newUserUuid;

      beforeEach(() => {
        postData = {
          firstName: 'test',
          lastName: 'user',
          email: 'auth.test@test-email.fake',
          password: 'supersecure',
          companyUuid: 1,
        };
      });

      afterEach(done => {
        if (newUserUuid) {
          const postData = { uuid: newUserUuid };
          console.log(`Deleting user #${newUserUuid}`);
          axiosInstance
            .delete('/api/users/remove_user', {
              data: postData,
            })
            .then(res => {
              if (res.data.ok) {
                console.log(`User #${newUserUuid} was deleted`);
              } else {
                console.log(`Unable to delete user #${newUserUuid}`);
              }
              done();
            });
        } else {
          done();
        }
      });

      it('should register a new user', done => {
        axiosInstance
          .post('/api/auth/register', postData)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.ok).toBe(true);
            expect(res.data.data.user).toBeTruthy();
            expect(res.data.data.token.includes('Bearer')).toBe(true);
            newUserUuid = res.data.data.user.uuid;
            done();
          })
          .catch(err => {
            console.log('Unable to register user.');
            console.log(err);
            expect(err).toBe(null);
            done();
          });
      });
    });
  });
});
