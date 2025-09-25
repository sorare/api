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
                card {
                  name
                  grade
                }
              }
            }
        """
        )

        async for result in session.subscribe(subscription):
            print(result["anyCardWasUpdated"])


asyncio.run(main())
