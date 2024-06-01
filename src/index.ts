#!/usr/bin/env node
import { Command } from "commander";
import { networkInterfaces } from "os";
import chalk from "chalk";
import QRCode from "qrcode";
import clipboard from "clipboardy";

// QR
const generateQR = async (text: string) => {
  try {
    const res = await QRCode.toString(text, { type: "utf8" });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

const program = new Command();

program
  .name("qrip")
  .description(chalk.magenta("expose your ip addreess to the world🌍"))
  .option(
    chalk.yellowBright("-p, --port <port-number>"),
    "give the url path (http://<ip-address>:<port>)",
  )
  .option(
    chalk.yellowBright("-r, --route <path-route>"),
    "give the url a route (http://<ip-address>/<route>",
  )
  .option(chalk.yellowBright("-s, --show"), "show the ip address")
  .option(chalk.yellowBright("-c, --copy"), "copy the ip address to clipboard")
  .action(
    async (opts: {
      port?: string;
      route?: string;
      show?: boolean;
      copy?: boolean;
    }) => {
      const nets = networkInterfaces();
      const res: Record<string, string[]> = {};
      const addresses: string[] = [];

      for (const name of Object.keys(nets)) {
        for (const net of nets?.[name]!) {
          if (net.family === "IPv4" && !net.internal) {
            if (!res[name]) {
              res[name] = [];
            }

            res[name]?.push(net.address);
            addresses.push(net.address);
          }
        }
      }

      const port = opts.port ? `:${opts.port}` : "";
      const route = opts.route ? `/${opts.route}` : "";
      const url = `http://${addresses[0]}${port}${route}`;
      await generateQR(url);

      if (opts.show) {
        console.log(`Your URL: ${chalk.magenta(url)}`);
      }

      if (opts.copy) {
        clipboard.writeSync(url);
        console.log(
          chalk.greenBright("URL has been copied to your clipboard ;)"),
        );
      }
    },
  );

program.parse(process.argv);
