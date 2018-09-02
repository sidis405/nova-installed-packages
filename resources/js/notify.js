export default {

    installing(packageName, toast){
        toast.show(`Installing '${packageName}'...`, { type: 'info', duration: 0});
    },

    installed(packageName, toast){
        toast.show(`'${packageName}' was installed successfully`, { type: 'success', duration: 0});
    },

    configuring(packageName, toast){
        toast.show(`Configuring  '${packageName}' ...`, { type: 'info', duration: 0});
    },

    configured(packageName, toast){
        toast.show(`'${packageName}' was configured successfully`, { type: 'success', duration: 0});
    }
}
