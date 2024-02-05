
const Messege = ({ messege, error }) => {
    if (!messege) return null
    return (
        <div className={error? 'error' : 'notification'}>
            {messege}
        </div>
    )
}

export default Messege