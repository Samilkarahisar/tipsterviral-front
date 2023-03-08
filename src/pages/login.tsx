import FormSection from '@/components/ui/FormSection';
import FormSectionsWrapper from '@/components/ui/FormSectionsWrapper';
import FormWrapper from '@/components/ui/FormWrapper';
import LoadingScreen from '@/components/ui/LoadingScreen';
import {
  auth,
  authWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
} from '@/lib/firebase';
import { IconEmail, IconGoogle } from '@/res/icons';
import { IFormSection } from '@/types/Form';
import errorMessageFromCode from '@/utils/firebaseErrors';
import isPasswordValidFormat from '@/utils/passwordValideFormat';
import { Input, Modal } from 'antd';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Container from '../components/ui/Container';

type FormItems = Omit<IFormSection, 'register'>;

const LoginPage = () => {
  const [user, loading] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [logging, setLogging] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showSamePasswordModal, setShowSamePasswordModal] = useState(false);
  const [showFirebaseErrorModal, setShowFirebaseErrorModal] = useState(false);
  const [showPasswordNotValidModal, setShowPasswordNotValidModal] =
    useState(false);
  const [showResetPasswordConfirmModal, setShowResetPasswordConfirmModal] =
    useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState('');
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const { from } = router.query;
  if (user && !logging) {
    router.push(from ? (from as string) : '/dashboard');
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, {
          path: '/',
          maxAge: 60 * 60,
        });
        setLogging(false);
      }
    });
  }, []);

  const registerFormItems: FormItems = {
    title: '',
    items: [
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        label: 'Confirm password',
        name: 'confirmPassword',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
    ],
  };

  const loginFormItems: FormItems = {
    title: '',
    items: [
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
    ],
  };

  const onResetPasswordConfirm = () => {
    sendPasswordReset(emailForPasswordReset).then(() => {
      setShowResetPasswordModal(false);
      setShowResetPasswordConfirmModal(true);
    });
  };

  return (
    <>
      <NextSeo
        title={`Se connecter à decoloco`}
        description={'Pour utiliser nos services vous devez vous connecter.'}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Modal
            open={showResetPasswordModal}
            onOk={() => onResetPasswordConfirm()}
            okText="Confirmer"
            onCancel={() => setShowResetPasswordModal(false)}
            destroyOnClose={true}
            title="Réinitialiser mon mot depasse">
            <Input
              type="email"
              placeholder="Votre email"
              onChange={(e) => {
                setEmailForPasswordReset(e.target.value);
              }}></Input>
          </Modal>
          <Modal
            open={showSamePasswordModal}
            onOk={() => setShowSamePasswordModal(false)}
            onCancel={() => setShowSamePasswordModal(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            title="Error">
            <div>Passwords don&apos;t match</div>
          </Modal>
          <Modal
            open={showResetPasswordConfirmModal}
            onOk={() => setShowResetPasswordConfirmModal(false)}
            onCancel={() => setShowResetPasswordConfirmModal(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            title="Email envoyé">
            <div>
              If an account with this email exists, you will receive a link to
              reset your password.
            </div>
          </Modal>
          <Modal
            open={showFirebaseErrorModal}
            onOk={() => setShowFirebaseErrorModal(false)}
            onCancel={() => setShowFirebaseErrorModal(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            title="Error">
            <div>{firebaseErrorMessage}</div>
          </Modal>
          <Modal
            open={showPasswordNotValidModal}
            onOk={() => setShowPasswordNotValidModal(false)}
            onCancel={() => setShowPasswordNotValidModal(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            title="Error">
            <div>
              Password must contain at least 8 characters, one lower-case
              letter, one upper-case letter, one digit and one special character
            </div>
          </Modal>
          <div className="flex tablet:gap-x-12 gap-x-8 gap-y-5 items-center flex-wrap mt-12 mb-12 w-full justify-center">
            <div className="flex flex-col space-y-5">
              {isCreatingAccount ? (
                <form
                  onSubmit={handleSubmit(async (values) => {
                    if (!isPasswordValidFormat(values.password)) {
                      setShowPasswordNotValidModal(true);
                    } else if (values.password == values.confirmPassword) {
                      setLogging(true);
                      const res = await registerWithEmailAndPassword(
                        values.email,
                        values.password,
                      );
                      if (res) {
                        setFirebaseErrorMessage(errorMessageFromCode(res));
                        setShowFirebaseErrorModal(true);
                      }
                    } else {
                      setShowSamePasswordModal(true);
                    }
                  })}>
                  <FormWrapper className="gap-x-14">
                    <FormSectionsWrapper>
                      <FormSection {...registerFormItems} register={register} />
                      <button className="flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-800 mt-6 py-[14px] w-[280px] rounded-lg bg-secondary dark:bg-dark-secondary">
                        <IconEmail className="fill-current text-gray2 mr-3" />
                        Sign up with Email
                      </button>
                      <label
                        className="cursor-pointer mt-5 text-xs text-[#007aff]"
                        onClick={() => setIsCreatingAccount(false)}>
                        Already have an account? Sign in
                      </label>
                    </FormSectionsWrapper>
                  </FormWrapper>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(async (values) => {
                    setLogging(true);
                    const res = await logInWithEmailAndPassword(
                      values.email,
                      values.password,
                    );
                    if (res) {
                      setFirebaseErrorMessage(errorMessageFromCode(res));
                      setShowFirebaseErrorModal(true);
                    }
                  })}>
                  <FormWrapper className="gap-x-14">
                    <FormSectionsWrapper>
                      <FormSection {...loginFormItems} register={register} />
                      <label
                        className="cursor-pointer mt-2 text-xs text-[#007aff]"
                        onClick={() => setShowResetPasswordModal(true)}>
                        Réinitialiser mon mot de passe
                      </label>
                      <button className="flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-800 mt-6 py-[14px] w-[280px] rounded-lg bg-secondary dark:bg-dark-secondary">
                        <IconEmail className="fill-current text-gray2 mr-3" />
                        Se connecter avec un mail
                      </button>
                      <label
                        className="cursor-pointer mt-5 text-xs text-[#007aff]"
                        onClick={() => setIsCreatingAccount(true)}>
                        Pas de compte? Créer dès maintenant.
                      </label>
                    </FormSectionsWrapper>
                  </FormWrapper>
                </form>
              )}
              <div className="h-px bg-secondary dark:bg-dark-secondary tablet:block hidden" />
              <button
                onClick={async () => {
                  setLogging(true);
                  await authWithGoogle();
                }}
                className="flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-800 py-[14px] w-[280px] rounded-lg bg-secondary dark:bg-dark-secondary">
                <IconGoogle className="fill-current text-gray2 mr-3" />
                Connexion facile avec Google
              </button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
