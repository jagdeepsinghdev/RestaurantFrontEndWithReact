import React, { useState, useEffect } from 'react'
import './Login.css'
import { Form, FormInput, Button, Message } from 'semantic-ui-react'
import InlineError from '../../messages/InlineError'
import axios from 'axios'
import { connect } from 'react-redux'
import { isLogin } from '../Store/Action/auth'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const [value, setValue] = useState('')
    const history = useHistory()
    const url = 'https://localhost:5001/Auth/login'
    const validate = (data) => {
        const errors = {}
        //if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.username) errors.username = "UserName Can't be blank"
        if (!data.password) errors.password = " PAssword Can't be blank"
        return errors
    }
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    useEffect(() => {
        console.log('state changed', value)
        props.isAuth(value)
    }, [value, props])

    const handleSubmit = (event) => {
        console.log('login presesed' + value)
        event.preventDefault()
        setErrors(validate(loginData))
        if (Object.keys(errors).length === 0) {
            const credentials = JSON.stringify(loginData)

            // console.log(JSON.stringify(loginData))
            axios
                .post(url, credentials, axiosConfig)
                .then((res) => {
                    // console.log('RESPONSE RECEIVED: ', res.data.token)
                    setValue(res.data.token)
                    history.push('/MenuItems')
                })
                .catch((err) => {
                    alert('Eroor' + err)
                    // console.log('AXIOS ERROR: ', err)
                })
        }
    }

    return (
        <>
            <div className="container">
                <h3>Welcome Pease Login here</h3>
            </div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {errors.title && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.title}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.username}>
                    <label htmlFor="username">Username</label>
                    <FormInput
                        type="username"
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        value={loginData.username}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                username: e.target.value,
                            })
                        }
                    />
                    {errors.username && <InlineError text={errors.username} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <FormInput
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            })
                        }
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        isAuth: (token) => {
            dispatch(isLogin(token))
        },
    }
}

export default connect(null, mapDispatchToProps)(Login)
