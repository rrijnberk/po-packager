# po-packager
The PO-Packager (or Page Object packager) is a small lightweight library which supports the exportation of page objects.
It's sole purpose is to enable test support interface publication alongside the component library.

## Installation
To locally install the library run: ```npm install -D po-packager``` 

To globally install the library run: ```npm install -g po-packager```


## Configuration
The **po-packager.json** only requires one attribute which is _**root**_ and the value of this should be the root
directory of your page-objects. For instance, if you separate your tests in a folder called **test**, further 
subdivide them into **unit** & **e2e** folders and then put your page objects for e2e testing in the **po** folder; then 
your config file would look like:

```json
{
  "root": "test/e2e/po"
}
```

## Usage
to generate the distribution you can add a script to your package.json and then run ```npm run po-packager```

```json
{
    "scripts": {
        "po-packager": "po-packager"
    }
}  
```

or, if installed globally, call ```po-pcakager``` within your project.
