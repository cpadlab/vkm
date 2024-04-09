import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="VKM",
    version="6.1",
    author="Carlos Padilla Labella",
    author_email="cpadlab@proton.me",
    description="A self-hosted indie password manager",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://cpadlab.github.io/",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3.11",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: POSIX :: Linux",
        "Framework :: FastAPI",
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "Natural Language :: English",
        "Intended Audience :: End Users/Desktop"
        "Intended Audience :: Developers",
        "Environment :: Console",
        "Environment :: Web Environment",
    ],
    python_requires=">=3.6",
    install_requires=[
        "cryptography==41.0.3",
        "fastapi==0.92.0",
        "pydantic==1.10.4",
        "uvicorn==0.17.6",
    ],
    project_urls={
        "Source": "https://github.com/cpadlab/vkm",
        "Documentation": "https://github.com/cpadlab/VKM/docs",
        "Bug Tracker": "https://github.com/cpadlab/VKM/issues",
        "Community": "https://github.com/cpadlab/VKM/discussions",
    },
)
