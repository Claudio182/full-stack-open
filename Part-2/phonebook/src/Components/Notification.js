
const Notification = ({ messege, error }) => {
    if ( messege === null ) return null
    return (
        <div className={ error? 'error' : 'notification'}>
            { messege }
        </div>
    )
}

export default Notification