## qrip-cli

![qrip-logo](https://github.com/oystr29/qrip/blob/main/assets/logo.png)

_expose your ip address to the world_

qrip is a cli that let you to get your current ip address of connected network. 

all you have to is just install [node](https://nodejs.org/en) and install it globally.

```bash
npm install -g qrip-cli
```

## usage

just run qrip and it will show you the qr code of your ip.

```bash
qrip                    # http: 192.168.x.x
```

### add port

to add port, just use the flags `-p` or `--port`

```bash
qrip -p 3000            # http: 192.168.x.x:3000
```

### route

if you want a route behind the url, use the flags `-r` or `--route`

```bash
qrip -r dashboard           # http: 192.168.x.x/dashboard
qrip -r dashboard -p 3000           # http: 192.168.x.x:3000/dashboard
```

### copy to clipboard

use `-c` or `--copy`

```bash
qrip -c                     # it will automatically copy the url to clipboard
```

### show the url of ip address

use `-s` or `--show`

```bash
qrip -s                     # it will show the ip address
```


