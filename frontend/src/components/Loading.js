//Loading page which gets passed a message to display as part of props.
function Loading(props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="border-t-4 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin mx-auto mb-4"></div>
        <p className="text-lg "> {props.message}</p>
      </div>
    </div>
  );
}

export default Loading;