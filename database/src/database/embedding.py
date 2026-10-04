import os
import asyncio
import base64
import ssl
import struct
import sys

import truststore
from dotenv import load_dotenv
from httpx import AsyncClient

load_dotenv()

model_endpoint = os.getenv("MODEL_ENDPOINT")
model_api_key = os.getenv("MODEL_API_KEY")

EMBEDDINGs = "/embeddings"

async_client = AsyncClient(verify=truststore.SSLContext(ssl.PROTOCOL_TLS_CLIENT))


def decode_embedding(b64_embedding: str, output_dtype: str) -> list[int | float]:
    raw = base64.b64decode(b64_embedding)
    if output_dtype == "float":
        return list(struct.unpack(f"<{len(raw) // 4}f", raw))
    if output_dtype in ("int8", "binary"):
        return list(struct.unpack(f"<{len(raw)}b", raw))
    if output_dtype in ("uint8", "ubinary"):
        return list(struct.unpack(f"<{len(raw)}B", raw))
    raise ValueError(f"unsupported output_dtype: {output_dtype}")


async def create_request(uri: str, payload: dict):

    async with async_client as client:
        response = await client.post(uri, headers={"Content-Type": "application/json", "Authorization": f"Bearer {model_api_key}"}, json=payload)
        print(f"status: {response.status_code} url: {response.url}")
        response.raise_for_status()
        yield response.json()['data']


async def run(input_text: str):
    payload = {
                "input": [input_text],
                "model": "voyage-4",
                "input_type": None,
                "truncation": True,
                "output_dimension": 256,
                "output_dtype": "float",
                "encoding_format": "base64"
                }
    async for data in create_request(f"{model_endpoint}{EMBEDDINGs}", payload):
        for item in data:
            print(item["embedding"])
            item["embedding"] = decode_embedding(item["embedding"], "float")
        print(item["embedding"])



def main() -> None:
    if len(sys.argv) < 2:
        sys.exit("Usage: uv run embedding <input text>")
    asyncio.run(run(sys.argv[1]))


if __name__ == "__main__":
    main()