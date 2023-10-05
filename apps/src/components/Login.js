const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [proceed, setProceed] = useState(false);

    const handleChangeUser = (event) => {
        setUsername(event.target.value)
    };

    const handleChangePass = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className="registerPg">
            <div className="register">
                <div className="headers">
                    <h1>Register Now!</h1>
                    <h3>Create account:</h3>
                </div>
                <form>
                    <label>username</label>
                    <input value={username} onChange={handleChangeUser} type="text"/>

                    <label>password</label>
                    <input value={username} onChange={handleChangeUser} type="text"/>

                    <button>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login