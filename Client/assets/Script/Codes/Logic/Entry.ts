import { Root } from '../../Core/Entity/Root'
import { EventSystem } from '../../Core/EventSystem/EventSystem'
import { ctLog } from '../../Core/Log/Logger'
import { AppStartInitFinish, EntryEvent } from './EventTypes'

export class Entry {
  public static async start () {
    ctLog('发送事件1')
    await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    ctLog('发送事件2')
    await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    ctLog('发送事件3')
    await EventSystem.inst.publishAsync(Root.inst.scene, EntryEvent.create())
    await EventSystem.inst.publishAsync(Root.inst.scene, AppStartInitFinish.create())
  }
}
