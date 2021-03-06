"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// This is the root "component". A component is one of the basic building of Angular app.
// A component controls a portion of the screen (a view) via its associated template.  
// There is at least one root component in every Angular app.
// Conventional naming: AppComponent
// The component file hosts the client UX
// Best practice: to create component per purpose/functionality
// Here we are importing the Component decorator function.
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const provider_service_1 = require('./provider.service');
// "Decorator" telling Angular what template to use and how to create the component.
// The @Component decorator function takes in a metadata object, that tells angular how to create
//  and use this component.
let ProviderComponent = class ProviderComponent {
    // keep complex logic out of the constructor. Use cstr for simple initializations.
    constructor(router, providerService) {
        this.router = router;
        this.providerService = providerService;
    }
    // The arrow function (=>) is new in ES2015 used in callbacks.
    // The callback below sets the component's providers property to the array of providers
    //  returned by the service.
    getProviders() {
        this.providerService
            .getProviders()
            .then(providers => this.providers = providers);
    }
    // Angular Lifecycle Hooks used to get providers
    ngOnInit() {
        this.getProviders();
    }
    onSelect(provider) {
        this.selectedProvider = provider;
    }
    gotoDetail() {
        this.router.navigate(['ProviderDetail', { id: this.selectedProvider.id }]);
    }
};
ProviderComponent = __decorate([
    core_1.Component({
        // This specifies a simple CSS selector for an HTML element to represent the component
        selector: 'providers',
        // This tells Angular how to render this component. 
        // double curly braces {{}} is called "interpolation" - this is one-way binding
        // ngModel is a build directive that allows two-way binding. It also propagates changes to
        //  every other binding of the provider.name.
        // The (*) prefix to ngFor indicates that the <li> element and its children constitute a master
        //  template
        // ngFor and ngIf are "structural directives" because they can change the structure of DOM.
        templateUrl: `../../app/provider.component.html`,
        // the style applied in the decorator is only specific to this component. The outer HTML is not
        //  affected.
        styleUrls: [`../../app/provider.component.css`]
    }), 
    __metadata('design:paramtypes', [router_1.Router, provider_service_1.ProviderService])
], ProviderComponent);
exports.ProviderComponent = ProviderComponent;
/*
Note:
* Reasons why we should not use the new ProviderSerivce() or force the code to use the service
   inteface (therefore we use service injection):
1. Our component has to know how to create a ProviderService. If we ever change the ProviderService
constructor, we'll have to find every place we create the service and fix it. Running around
patching code is error prone and adds to the test burden.

2. We create a new service each time we use new. What if the service should cache providers and share
that cache with others? We couldn't do that.

3. We're locking the AppComponent into a specific implementation of the ProviderService. It will be
hard to switch implementations for different scenarios. Can we operate offline? Will we need
different mocked versions under test? Not easy.
*/
//# sourceMappingURL=provider.component.js.map