# PLCOpen-Editor
<br>
<div align="center" class="border">
<img style="margin-left: 30" src="https://github.com/elian15122000/TINF19C-PLCOpen-Editor/blob/master/Resources/PLC_Logo.png">
</div>
<br>
<h2>Welcome to the repository of the Web PLCOpen-Editor!</h2>

This is a student project developed at Baden-Wuerttemberg Cooperative State University (DHBW) Stuttgart and supervised by Markus Rentschler and Christian Holder.
<br>
Our team members are:<br>
1. Mouaz Tabboush
2. Leonie de Santis
3. Elian Yildirim
4. Franziska Kopp
<br>
The goal of this project is to develop a web version of the [OpenPLC-Editor](https://www.openplcproject.com/plcopen-editor/) that supports the Sequential Function Chart (SFC) and Function Block Diagram (FBD) languages.
It is supposed to be an easy tool to create PLC programs without needing to install the software.

## How to run
**Installing NodeJs**<br>
In order to install Angular you need npm, which comes with NodeJs.
visit this [link](https://nodejs.org/en/download/) to download and install NodeJs

**Installing Angular**<br>
Now go to your terminal and install angular by entering the following:
```npm install -g @angular/cli```

**Installing dependencies**<br>
Navigate in the terminal into SOURCE in the terminal and enter
```npm i```
this should install all the packages needed for the project

**Testing the project**<br>
If all the dependancies are installed just navigate to OpenPLC-UI in the terminal and enter
```ng serve```
This will lunch a development serve on ```localhost://4200``` open that on your browser and you should be good to go

## FAQ <br>
**What is PLC?**<br>
PLC stands for Programable logic controllers.<br>
A simple way to understand it would be to think of PLC as a small computer that performs a list of instructions.<br>
The list of instructions contains logic that helps determine which course of action to take on a given set of circumstances.<br>
PLC is used in alot of areas inside and outside the industrial work. Usually where automation of tasks is the goal.<br>
The PLC editor itself helps user create programs without the need to know the syntax of the used programming lanugage for the PLC. All what the user needs to do is to determine the logic for the controller.<br>
The OpenPLC [Reference page](https://www.openplcproject.com/plcopen-editor/) has a nice tutorial to follow along and learn about PLC<br>
<br>
**Why are we doing the project?**<br>
We want to develop a web version of the OpenPLC Editor to allow users to work on their programs remotely without requiring installation.<br>
You can find more information about the project by visiting the wiki and reading the [Customer Requirement Specification](https://github.com/elian15122000/TINF19C-PLCOpen-Editor/blob/master/PROJECT/CRS/TINF19C_CRS_Team_1_0v1.pdf), [System Requirements Specification](https://github.com/elian15122000/TINF19C-PLCOpen-Editor/wiki/1.-System-Requirements-Specification) and [System Architecture Specification](https://github.com/elian15122000/TINF19C-PLCOpen-Editor/wiki/2.-System-Architecture-Specification) documents.<br>

**What technologies are we using to make the application?**<br>
The Application runs is written in Angular 8 and runs solely as a front end application. There is no backedend envolved<br>
<br>
<br>

**Why are we using this template for the project?**<br>
Its required of us to use this template.<br>
However, you only need to navigate to OpenPLC-UI to see our source-code. Everything outside of the that folder is just for Project management purposes.
The Template works as follows:
* OpenPLC-UI: Has all the sourcefiles needed to run the project
* Meeting Minutes: The folder where we save protocols of our meetings
* Executables: Part of the template we have to use, but we don't have any executables so this folder is not necessary
* Resources: The folder where we save all pictures we need to reference in the markdown documents
* Project: The Folder where we keep all organisation related documents.
<br>
<br>
