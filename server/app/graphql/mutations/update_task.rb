# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation

    field :task, Types::TaskType, null: false
    field :message, [String], null: false

    argument :id, String, required: true
    argument :completed, Boolean, required: true


    def resolve(id:, completed:)
      task = Task.find(id)
      task.update(completed: completed)
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
