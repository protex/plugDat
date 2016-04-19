// Define global variable for waitlist
// Must use window.xyz syntax because transpiler will invoke "use strict";
window._plugDat_waitList = [];
class plugDat {
    
    constructor(){
        
        /*
        *   Object: settings
        *   Description: Contains global plugDat settings
        */
        
        this.settings = {};
        
        /*
        * Object: dat
        * Description: Contains instances of all economey plugins
        */
        
        this.dat = {};    
        
        /*
        *   Array: initLoci
        *   Description: Location and priority of init functions
        */   
        
        this.initLoci = [];
        
        /*
        *   Object: callBlock
        *   Description: Object containting plugin init functions grouped by priority for calling
        */
        
        this.callBlock = {};
        
    } 
    
    /*
    *   Function: init
    *   Description: Handles initiation
    *   Params: *none*
    *   Returns: *none*
    */
    
    init(){
        // Create new event to run on initiation
        let bang = new Event('letsroll');
        
        // Create interval to wait for all plugins to be installed
        let pause = setInterval(() => {
            // Check if all plugins have been installed
            if(_plugDat_waitList.length === 0) {
                // Call the ready event
                document.dispatchEvent(bang);
                
                // Map initLoci to call by groups
                this.callBlock = this.initLoci.map(loci => {
                    let priority = {"1": [], "2": [], "3": [], "4": [], "5": []};
                    priority[loci.priority].push({name, loci});
                    return priority;
                })
                
                // Create global pointers to all plugins in priority 1
                for(var i in callBlock[0]) {
                    window[callBlock[0].name] = this.dat[name];
                }
                
                // Initiate each plugin in order by priority
                let callBlock = this.callBlock;
                for(var i in callBlock) {
                    for(var x in callBlock[i]) {
                        if (callBlock[i][x].initLoci === "global") {
                            window[callBlock[i][x].name].init();
                        } else {
                            window[callBlock[i][x][initLoci]][callBlcok[i][x].name].init();
                        }
                    }
                }
                
                // Clear the interval
                clearInterval(pause);
            }
        }, 500);
        
    }
    
    /*
    *   Function: forge
    *   Description: Creates new plugin object
    *   Params: *name* - *string* - Name of plugin
    *           *plugin* - *object* - Plugin function object
    *   Returns: *bool*
    */
    
    forge(name, plugin){
        // Get index of name in waitList
        let waitIndex = _plugDat_waitList.indexOf(name);
        if(typeof plugin !== 'object') {
            console.error('Plugin variable must be an object type.');
            return false;
        } else if (plugin.init !== 'function') {
            console.error('Plugin does not contain an "init" function, please define one.');
            return false;
        } else if(waitIndex === -1 ) {
            console.error(name + ' plugin was not listed in the waitlist. Please add it before you try to plug it in.');
            return false;
        } else {
            // Plug the plugin
            this.dat[name] = plugin;
            // Push the init location data for initiation mapping
            this.initLoci.push({name, initLoci: 'global', priority: 1});
            // Delete this name from the waitList
            _plugDat_waitList.splice(waitIndex, 1);
            return true;
        }
    }
    
    /*
    *   Function: plug
    *   Description: Inserts plugin into existing plugin
    *   Params: *name* - *string* - Name of plugin
    *           *loci* - *string* - Name of existing plugin to be plugged. i.e. parent plugin
    *           *priority* - *int* - Priority (1-5, high-low) of plugin. Plugins will be called in groups by order of priority
    *           *plugin* - *object* - Plugin function object
    *   Returns: *bool*
    */
    
    plug(name, loci, priority, plugin){
        // Get index of name in waitList
        let waitIndex = _plugDat_waitList.indexOf(name);
        
        // Make sure plugin settings are in order
        if(typeof plugin !== "object") {
            console.error('Plugin variable must be an object type.');
            return false;
        } else if(this.dat[loci] === undefined){
            console.error(loci + ' plugin does not exist in plugDat. Either create it first or make sure you spelled it correctly.');
            return false;
        } else if(waitIndex === -1 ) {
            console.error(name + ' plugin was not listed in the waitlist. Please add it before you try to plug it in.');
            return false;
        } else {
            // Plug in the plugin
            this.dat[loci][name] = plugin;
            // Push the init location data for initiation mapping
            this.initLoci.push({name, initLoci: loci, priority});
            // Delete this entry from the waitList
            _plugDat_waitList.splice(waitIndex, 1);
            return true;
        }
    }
    
    /*
    *   Function: evangalize
    *   Description: Creates a global instance of the plugin
    *   Params: *name* - *string* - The name of the pluging to globalize. Only works on parent plugins.
    *   Returns: *bool*
    */
    
    evangalize(name) {
        if(this.plugin[name] === undefined){
            console.error(name + ' plugin does not exist, it cannot be globalized.');
            return false;
        } else {
            window[name] = this.plugin[name];
        }
    }
    
}