import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { Status } from "./actions/status";

streamDeck.logger.setLevel(LogLevel.TRACE);

streamDeck.actions.registerAction(new Status());

streamDeck.connect();
