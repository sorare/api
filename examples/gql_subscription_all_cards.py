# First install:
# pip install gqlactioncable

import asyncio

from gql import Client, gql

from gqlactioncable import ActionCableWebsocketsTransport


async def main():

    transport = ActionCableWebsocketsTransport(
        url="wss://ws.sorare.com/cable",
        keep_alive_timeout=60,
    )

    async with Client(transport=transport) as session:

        subscription = gql(
            """
            subscription onAnyCardUpdated {
              anyCardWasUpdated {
                slug
              }
            }
        """
        )

        async for result in session.subscribe(subscription):
            print(result)


asyncio.run(main())
