import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private SETTINGS_KEY: string = '_movies';
  public settings: any = {};
  _defaults: any = {};

  get page(){
    return this.getValue('page')? this.getValue('page'):'Home'; 
  }

  get session(){
    return this.getValue('session')? this.getValue('session'):''; 
  }


  load(defaults = this._defaults) {
    try {
      this.settings = JSON.parse(sessionStorage.getItem(this.SETTINGS_KEY));
      if (!this.settings) {
        this.settings = {};
      }
    } catch (error) {
      this.settings = {};
    }

    this._mergeDefaults(defaults);
    this.save();
  }

  _mergeDefaults(defaults: any) {
    this.settings = {
      ...defaults,
      ...this.settings,
    }
  }

  merge(settings: any) {
    this.settings = {
      ...this.settings,
      ...settings,
    };
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    sessionStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
  }

  setAll(value: any) {
    this.settings = value;
    sessionStorage.setItem(this.SETTINGS_KEY, JSON.stringify(value));
  }

  getValue(key: string) {
    this.settings = JSON.parse(sessionStorage.getItem(this.SETTINGS_KEY));
    if (this.settings && this.settings[key]) {
      return this.settings[key]
    }
    return null;
  }

  save() {
    return this.setAll(this.settings);
  }


  getAllSettings(): any {
    return this.settings;
  }

  cleanUser() {
    let page;
    if (this.settings && this.settings.page) {
      page = this.settings.page;
    }
    delete this.settings;
    this.settings = {};
    if (page) { this.setValue('page', page) }
    return this.save()
  }
}
