# Cubi IDE

## Features

- Command Palette Integration
    Easily trigger build, flash, and debug tasks via custom commands.

- One-click Build and Flash
Integrates [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) and [Cortex-Debug](https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug) to allow seamless build, flash, and debug steps from within VS Code.

- CMake Preset Support
    Automatically selects and applies CMakePresets.json settings where applicable.

- Integrated Debugging
    Works hand-in-hand with Cortex-Debug to launch GDB sessions for STM32 and other Cortex-M devices.

## Requirements

This extension depends on the following Visual Studio Code extensions:

- [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)
- [Cortex-Debug](https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug)

Make sure these extensions and their own dependencies are properly installed.  
For example, you may need tools like `CMake`, `ninja`, `arm-none-eabi-gcc`, or `OpenOCD`, depending on your development environment.


## Extension Settings

This extension contributes the following settings:

* `cubi.ide.openocdPath`: Path to the OpenOCD, default to `openocd`.
* `cubi.ide.gdbPath`: Path to the GDB, default to `arm-none-eabi-gdb`.

## Release Notes

### 0.1.0

Initial release of Cubi IDE

---

## For more information

* [GitHub](https://github.com/ChisaZing/Cubi-IDE)
