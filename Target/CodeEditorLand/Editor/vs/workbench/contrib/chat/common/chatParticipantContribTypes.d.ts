export interface IRawChatCommandContribution {
    name: string;
    description: string;
    sampleRequest?: string;
    isSticky?: boolean;
    when?: string;
    defaultImplicitVariables?: string[];
    disambiguation?: {
        category: string;
        categoryName?: string;
        description: string;
        examples: string[];
    }[];
}
export type RawChatParticipantLocation = 'panel' | 'terminal' | 'notebook' | 'editing-session';
export interface IRawChatParticipantContribution {
    id: string;
    name: string;
    fullName: string;
    when?: string;
    description?: string;
    supportsModelPicker?: boolean;
    isDefault?: boolean;
    isSticky?: boolean;
    sampleRequest?: string;
    commands?: IRawChatCommandContribution[];
    defaultImplicitVariables?: string[];
    locations?: RawChatParticipantLocation[];
    disambiguation?: {
        category: string;
        categoryName?: string;
        description: string;
        examples: string[];
    }[];
    supportsToolReferences?: boolean;
}
export declare const CHAT_PROVIDER_ID = "copilot";