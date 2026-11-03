<div align="center">
        <img src="https://i.imgur.com/THCaiVp.png" style="width: 1200px"/>
    <h2>Launch into Infrared, the next gen proxy.</h2>
</div>

![inpreview](https://i.imgur.com/JM3Jazt.png)

> [!IMPORTANT]
> If you fork this repo please consider giving the original repo a
> star. Thank you!

## Features

-   Out of this world UI
-   Games
-   Apps
-   Proxy
-   Settings
-   Cloaking [Blob & About:Blank]
-   Tab Cloaking [Presets]

## Deployment

### Login configuration

Infrared includes a server-side login gate. Configure these environment variables in your deployment platform:

```env
INFRARED_AUTH_USER=admin
INFRARED_AUTH_PASSWORD=use-a-strong-password
INFRARED_AUTH_SECRET=generate-a-long-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-domain.example/api/auth/google/callback
CLOUDFLARE_TUNNEL_ID=your-tunnel-uuid
CLOUDFLARE_TUNNEL_CREDENTIALS={"AccountTag":"...","TunnelID":"...","TunnelSecret":"..."}
CLOUDFLARE_TUNNEL_HOSTNAME=infrared.earth
CLOUDFLARE_TUNNEL_ORIGIN=http://127.0.0.1:2000
```

Generate a session secret with `pnpm auth:secret`. The password is never stored in the browser; sessions use an HttpOnly, signed cookie.

Add the exact `GOOGLE_CALLBACK_URL` to Google Cloud Console under **OAuth client → Authorized redirect URIs**.

For a locally managed Cloudflare Tunnel, add the tunnel ID and credentials JSON as Railway secrets. The credentials JSON must never be committed to Git.

> [!WARNING]
> You **can not** host Infrared locally via a static web hosting site
> such as Netlify, Github Pages, and Cloudflare Pages.

Please run the following commands to host a server:

```
git clone https://github.com/OGsWorkshop/Infrared.Git
cd Infrared
pnpm i
pnpm start
```

### Updating

```
git pull --force --allow-unrelated-histories
```

## Where to ask for help

> [!NOTE]
> If you'd like to get links, support, or other deployment methods join
> our [Discord Server](https://discord.gg/yTmmCFv59Q)) or open a discussion.

## Contribution

To contribute to Infrared, clone the repo locally and submit your code in a pull
request. If you are making large changes, please make sure you test your code
before submitting a pull request. Please check contributing.md for a more in-depth explanation.

## Contributors

Thank you to the following people for contributing to Infrared.

## Discord

[Discord](https://discord.gg/yTmmCFv59Q)
