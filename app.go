package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// 关闭窗口
func (a *App) CloseWind() {
	runtime.Quit(a.ctx)
}

// 窗口最大化
func (a *App) MaxWind() {
	runtime.WindowToggleMaximise(a.ctx)
}

// 窗口最小化
func (a *App) MinWind() {
	runtime.WindowMinimise(a.ctx)
}
