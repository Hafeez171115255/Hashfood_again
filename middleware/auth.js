export default function ({ store, redirect, route }) {
    // If the user is not logged in
    if (!store.state.authUser) {
        if (route.path != '/') {
            return redirect(`/auth/login?return_url=${route.path}`)
        }
        return redirect('/auth/login?')
    }

    else if (store.state.authUser.status == 'inactive') {
        return redirect(`/auth/verify_email`)
    }
}