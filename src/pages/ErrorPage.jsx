import React from 'react';

function ErrorPage() {
    return (
        <div class="error-page">
            <img
                src="/images/error-404.png"
                alt="go to homepage"
                class="logo"
            />
            <h2>Uh-oh, looks like this route does not exist!</h2>
            <a href="/">Go back to the homepage</a>
        </div>
    );
}

export default ErrorPage;
