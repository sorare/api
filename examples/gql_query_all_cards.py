# First install:
# pip install gql[aiohttp]

import asyncio

from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport


async def main():

    transport = AIOHTTPTransport(
        url="https://api.sorare.com/graphql",
        # headers = {"Authorization": "Bearer <TheUserAccessToken>"}
    )

    async with Client(transport=transport) as session:

        query = gql(
            """
            query getAllCards {
                allCards {
                    nodes {
                        name
                        age
                    }
                }
            }
        """
        )

        result = await session.execute(query)

        for card in result["allCards"]["nodes"]:
            print(f"  Age: {card['age']}, Name: {card['name']}")


asyncio.run(main())
