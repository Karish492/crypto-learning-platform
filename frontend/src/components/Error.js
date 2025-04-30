//Error page which gets passed a message.
function Loading(props) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="text-center p-6 bg-red-300 rounded-lg shadow-lg">
          <p className="text-lg text-red-800">{props.message}</p>
        </div>
    </div>
    );
}
  
  export default Loading;