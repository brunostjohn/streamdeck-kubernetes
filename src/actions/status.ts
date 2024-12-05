import {
  action,
  DidReceiveSettingsEvent,
  JsonValue,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
  streamDeck,
} from "@elgato/streamdeck";

@action({ UUID: "com.brunostjohn.sdkubernetes.status" })
export class Status extends SingletonAction<StatusSettings> {
  override onWillAppear(
    ev: WillAppearEvent<StatusSettings>
  ): void | Promise<void> {
    return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`);
  }

  override async onKeyDown(ev: KeyDownEvent<StatusSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.incrementBy ??= 1;
    settings.count = (settings.count ?? 0) + settings.incrementBy;

    await ev.action.setSettings(settings);
    await ev.action.setTitle(`${settings.count}`);
  }

  override async onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<StatusSettings>
  ): Promise<void> {
    streamDeck.logger.trace("SendToPlugin" + JSON.stringify(ev.payload));
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<Message, StatusSettings>
  ): Promise<void> {
    if (ev.payload.type === "pingCluster") {
      streamDeck.logger.trace("Pong!");
    }
  }
}

type PingCluster = {
  type: "pingCluster";
};

type Message = PingCluster;

type StatusSettings = {
  count?: number;
  incrementBy?: number;
};
