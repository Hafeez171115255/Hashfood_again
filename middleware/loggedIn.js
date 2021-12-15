export default function ({ store, redirect, route }) {
    // If the user status is not active
    if (store.state.authUser && store.state.authUser.status == 'inactive') {
        return redirect(`/auth/verify_email`)
    }

    // If the user is not authenticated
    else if (route.path != '/' && store.state.authUser) {
        return redirect("/");
    }
}