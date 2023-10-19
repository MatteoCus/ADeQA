'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ade-qa documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApiModule-482dfc07bb4044b7bde809d83568948da5f7ac71e5f03be97022fb7bf720ee7c97569078a5fb72b4f1f2885f580c58307b0becd611e5aef2bcab2721370b2db6"' : 'data-bs-target="#xs-injectables-links-module-ApiModule-482dfc07bb4044b7bde809d83568948da5f7ac71e5f03be97022fb7bf720ee7c97569078a5fb72b4f1f2885f580c58307b0becd611e5aef2bcab2721370b2db6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-482dfc07bb4044b7bde809d83568948da5f7ac71e5f03be97022fb7bf720ee7c97569078a5fb72b4f1f2885f580c58307b0becd611e5aef2bcab2721370b2db6"' :
                                        'id="xs-injectables-links-module-ApiModule-482dfc07bb4044b7bde809d83568948da5f7ac71e5f03be97022fb7bf720ee7c97569078a5fb72b4f1f2885f580c58307b0becd611e5aef2bcab2721370b2db6"' }>
                                        <li class="link">
                                            <a href="injectables/ApiConfiguration.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiConfiguration</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OperatorsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OperatorsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QualityAttributeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QualityAttributeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QualityPhaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QualityPhaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QualitySaveLogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QualitySaveLogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' : 'data-bs-target="#xs-components-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' :
                                            'id="xs-components-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDataDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDataDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogModifierComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogModifierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPinComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginUsernameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginUsernameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhasesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhasesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' : 'data-bs-target="#xs-pipes-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' :
                                            'id="xs-pipes-links-module-AppModule-253cca6d051bc918045d7797aa61002587cf2bd1b2b3da4ee4291dde3335ebd0cd5f4b86dbbeea29ce4c6a70428f2a8d1c186013164212bb448bf232e3ab95b1"' }>
                                            <li class="link">
                                                <a href="pipes/OptionsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptionsPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/HeaderParameter.html" data-type="entity-link" >HeaderParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Parameter.html" data-type="entity-link" >Parameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterCodec.html" data-type="entity-link" >ParameterCodec</a>
                            </li>
                            <li class="link">
                                <a href="classes/PathParameter.html" data-type="entity-link" >PathParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryParameter.html" data-type="entity-link" >QueryParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestBuilder.html" data-type="entity-link" >RequestBuilder</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActiveAttributesService.html" data-type="entity-link" >ActiveAttributesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActivePhaseService.html" data-type="entity-link" >ActivePhaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiConfiguration.html" data-type="entity-link" >ApiConfiguration</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthInformationsService.html" data-type="entity-link" >AuthInformationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IframeInitializerService.html" data-type="entity-link" >IframeInitializerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogoutService.html" data-type="entity-link" >LogoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperatorsService.html" data-type="entity-link" >OperatorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QualityAttributeService.html" data-type="entity-link" >QualityAttributeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QualityPhaseService.html" data-type="entity-link" >QualityPhaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QualitySaveLogService.html" data-type="entity-link" >QualitySaveLogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Add$Params.html" data-type="entity-link" >Add$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiConfigurationParams.html" data-type="entity-link" >ApiConfigurationParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Delete$Params.html" data-type="entity-link" >Delete$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorModel.html" data-type="entity-link" >ErrorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Fetch$Params.html" data-type="entity-link" >Fetch$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Fetch_1$Params.html" data-type="entity-link" >Fetch_1$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Fetch_2$Params.html" data-type="entity-link" >Fetch_2$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Fetch_3$Params.html" data-type="entity-link" >Fetch_3$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchRequestOperatorsModel.html" data-type="entity-link" >FetchRequestOperatorsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchRequestQualityattributeModel.html" data-type="entity-link" >FetchRequestQualityattributeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchRequestQualityphaseModel.html" data-type="entity-link" >FetchRequestQualityphaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchRequestQualitysavelogModel.html" data-type="entity-link" >FetchRequestQualitysavelogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchResponseOperatorsModel.html" data-type="entity-link" >FetchResponseOperatorsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchResponseQualityattributeModel.html" data-type="entity-link" >FetchResponseQualityattributeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchResponseQualityphaseModel.html" data-type="entity-link" >FetchResponseQualityphaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchResponseQualitysavelogModel.html" data-type="entity-link" >FetchResponseQualitysavelogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterOperatorsModel.html" data-type="entity-link" >FilterOperatorsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterQualityattributeModel.html" data-type="entity-link" >FilterQualityattributeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterQualityphaseModel.html" data-type="entity-link" >FilterQualityphaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterQualitysavelogModel.html" data-type="entity-link" >FilterQualitysavelogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonList.html" data-type="entity-link" >JsonList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login$Params.html" data-type="entity-link" >Login$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Logout$Params.html" data-type="entity-link" >Logout$Params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OperatorsModel.html" data-type="entity-link" >OperatorsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/optionType.html" data-type="entity-link" >optionType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderOperatorsModel.html" data-type="entity-link" >OrderOperatorsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderQualityattributeModel.html" data-type="entity-link" >OrderQualityattributeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderQualityphaseModel.html" data-type="entity-link" >OrderQualityphaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderQualitysavelogModel.html" data-type="entity-link" >OrderQualitysavelogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterOptions.html" data-type="entity-link" >ParameterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QualityattributeModel.html" data-type="entity-link" >QualityattributeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QualityphaseModel.html" data-type="entity-link" >QualityphaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QualitysavelogModel.html" data-type="entity-link" >QualitysavelogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Update$Params.html" data-type="entity-link" >Update$Params</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});