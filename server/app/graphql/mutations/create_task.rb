# frozen_string_literal: true

module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :message, [String], null: false

    argument :list_id, String, required: true
    argument :description, String, required: true
    argument :due_date, GraphQL::Types::ISO8601Date, required: true

    def resolve(list_id:, description:, due_date:)
      task = Task.create(description: description, list_id: list_id, completed: false, due_date: due_date)
      if task.save
        { 
          task: task, 
          message: [] 
        }
        else
        { 
          task: nil, 
          message: task.errors.full_message
        }
      end
      
    end
  end
end
