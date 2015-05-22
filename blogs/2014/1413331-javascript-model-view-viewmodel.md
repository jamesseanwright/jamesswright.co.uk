# Code Snippet - Model-View-ViewModel pattern in JavaScript

<time datetime="2014-10-15">15th October 2014</time>

See it in action at [JSFiddle](http://jsfiddle.net/3a5rmbxz/13/).

#### HTML
```
<div data-viewmodel='mainViewModel'>
    <h1 data-binding='{"innerText": "title"}'></h1>
    <p data-binding='{"innerText": "information"}'></p>
    
    <h2 data-binding='{"innerText": "nextStepsTitle"}'></h2>
    <ul data-repeat='nextSteps'></ul>
    
    <hr />
	
    <h5>Requested <span data-binding='{"innerText": "currentDate"}'></span></h5>
</div>
```

#### JavaScript
```
(function () {
    'use strict';
    
    var App = {
        createViewModel: function (name, properties) {
            var ViewModel;
            
            if (!this.viewModels) {
                this.viewModels = [];   
            }
            
            if (!ViewModel) {
                ViewModel = function (n, p) {
                    var name = n,
                        properties = p;
                    
                    this.getName = function () {
                        return name;  
                    };
                    
                    this.getProperties = function () {
                        return properties;
                    };
                };
            }
            
            this.viewModels.push(new ViewModel(name, properties));
        },
        
        initialise: function () {
            var currentViewModel;
            
            resolveBinding(document.body);
                               
            function resolveBinding(element) {
                var data;
                
                if (!element) {
                    return;
                }
                
                data = element.dataset;
                
                if (data && data.viewmodel && data.viewmodel !== '') {
                    currentViewModel = getViewModel(data.viewmodel);
                }
                
                if (currentViewModel) {
                    
                    var binding = tryParse(data.binding);
                    for (var prop in binding) {
                        element[prop] = currentViewModel.getProperties()[binding[prop]];
                    }
                    
                    if (element.tagName === 'UL' && isValidAttribute(data.repeat)) {
                        var items = currentViewModel.getProperties()[data.repeat];
                        items.forEach(function (item) {
                            var el = document.createElement('li');
                            el.innerText = item;
                            element.appendChild(el); 
                        });
                    }
                }
                
                for (var i = 0; i < element.children.length; i++) {
                    resolveBinding(element.children[i]);
                }
            }
            
            function getViewModel(name) {
                var viewModel;
                
                App.viewModels.forEach(function (vm) {
                    if (vm.getName() === name) {
                        viewModel = vm;
                        return;
                    }
                });
                
                return viewModel;
            }
            
            function tryParse(binding) {
                if (!isValidAttribute(binding)) {
                    return {};
                }
                
                try {
                    return JSON.parse(binding);   
                } catch (e) {
                    return {};   
                }
            }
    
            function isValidAttribute(dataAttr) {
                return dataAttr && dataAttr !== '';
            }
        }
    };
    
    (function () {
        App.createViewModel('mainViewModel', {
            title: 'Model-View-ViewModel in JavaScript',
            information: 'This is a primitive Model-View-ViewModel implementation written in JavaScript.',
            nextStepsTitle: 'Next Steps',
            nextSteps: [
                'Observable properties',
                'Data providers',
                'Models',
                'Deeper UI manipulation',
                'More robust binding parsing',
                'Optimisation'
            ],
            currentDate: new Date().toString()
        });
                            
        App.initialise();
    }());  
}());
```