import * as React from "react"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef(({ className, defaultValue, onValueChange, children, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue)

    // Clone children to pass required props
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { value, setValue })
        }
        return child
    })

    return (
        <div
            ref={ref}
            className={cn("", className)}
            {...props}
        >
            {childrenWithProps}
        </div>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, value, setValue, children, ...props }, ref) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { selectedValue: value, setValue })
        }
        return child
    })

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
                className
            )}
            {...props}
        >
            {childrenWithProps}
        </div>
    )
})
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, selectedValue, setValue, children, ...props }, ref) => {
    const isSelected = value === selectedValue
    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => setValue && setValue(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isSelected && "bg-background text-foreground shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, selectedValue, children, ...props }, ref) => {
    if (value !== (props.value || selectedValue)) return null // Simple context-less implementation hack

    // If we're using Context in a real app this is cleaner, but for this zero-dep setup relying on parent clone
    // Checking props.value from parent clone in Tabs

    return (
        <div
            ref={ref}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
TabsContent.displayName = "TabsContent"

// Fix for nested props passing because I'm lazy to write a full context
// Ideally use Context API, but let's just make sure TabsContent can read the value from somewhere.
// Actually, let's rewrite Tabs to use Context to be safe.

const TabsContext = React.createContext({})

const TabsRoot = ({ defaultValue, children, className }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    )
}

const TabsListContext = ({ children, className }) => (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
        {children}
    </div>
)

const TabsTriggerContext = ({ value, children, className }) => {
    const { activeTab, setActiveTab } = React.useContext(TabsContext)
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                activeTab === value && "bg-background text-foreground shadow-sm",
                className
            )}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    )
}

const TabsContentContext = ({ value, children, className }) => {
    const { activeTab } = React.useContext(TabsContext)
    if (activeTab !== value) return null
    return (
        <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
            {children}
        </div>
    )
}

export { TabsRoot as Tabs, TabsListContext as TabsList, TabsTriggerContext as TabsTrigger, TabsContentContext as TabsContent }
