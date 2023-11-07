import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ username: '', displayName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                displayName: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required()
            })}  
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h1' textAlign='center' color='teal'>Register to Reactivities</Header>
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Username' name='username' />
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationError errors={errors.error as unknown as string[]}/>}
                    />
                    <Button 
                    loading={isSubmitting} 
                    disabled={!isValid || !dirty || isSubmitting}
                    positive content='Register' 
                    type='submit' 
                    fluid />
                </Form>
            )}
        </Formik>
    )
})