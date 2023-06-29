import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="VKM",
    version="5.0.0",
    author="Carlos Padilla Labella",
    author_email="cpadlab@gmail.com",
    description="A self-hosted indie password manager",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://14wual.github.io/vkm",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3.11",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    install_requires=[
        "uvicorn==0.17.6",
        "fastapi==0.92.0",
        "pydantic==1.10.4",
        "pykeepass==4.0.3",
    ],
)
