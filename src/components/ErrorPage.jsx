import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Ooops!!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{ error.statusText || error.message }</i>
      </p>
    </div>
  )
}

export default ErrorPage
